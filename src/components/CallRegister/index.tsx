import { useState, useEffect } from 'react';
import {
  collection,
  getDocs,
  query,
  orderBy,
  deleteDoc,
  doc,
  addDoc,
} from 'firebase/firestore';
import { db } from '../../services/firebaseConfig';
import { getAuth } from 'firebase/auth';
import Header from '../Header';
import Footer from '../Footer';

interface Call {
  id?: string;
  matricula: string;
  dia: string;
  horario: string;
  segundoNumero?: string;
  observacao?: string;
}

const whatsappUrl = `https://web.whatsapp.com/send?phone=$+554398100176&text=Ligação%20agendada%20!`;

const CallRegister = () => {
  const [calls, setCalls] = useState<Call[]>([]);
  const [filteredCalls, setFilteredCalls] = useState<Call[]>([]);
  const [selectedCalls, setSelectedCalls] = useState<string[]>([]);
  const [highlightedCalls, setHighlightedCalls] = useState<string[]>([]);
  const [newCall, setNewCall] = useState<Call>({
    matricula: '',
    dia: new Date().toISOString().slice(0, 10),
    horario: '',
    segundoNumero: '',
    observacao: '',
  });
  const [filterDate, setFilterDate] = useState<string>('');
  const [error, setError] = useState('');
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = getAuth().onAuthStateChanged((user) => {
      if (user?.email === 'admin@email.com') {
        setIsAdmin(true);
      }
    });
    return () => unsubscribe();
  }, []);

  

  useEffect(() => {
    const fetchCalls = async () => {
      try {
        const callsRef = collection(db, 'calls');
        const q = query(callsRef, orderBy('dia', 'asc'), orderBy('horario', 'asc'));
        const snapshot = await getDocs(q);
        const callsList: Call[] = snapshot.docs.map((docItem) => ({
          ...docItem.data(),
          id: docItem.id,
        })) as Call[];
        setCalls(callsList);
        setFilteredCalls(callsList);
      } catch (error) {
        console.error('Erro ao buscar as ligações:', error);
      }
    };
    fetchCalls();
  }, []);

  const applyFilter = () => {
    if (filterDate) {
      setFilteredCalls(calls.filter((call) => call.dia === filterDate));
    } else {
      setFilteredCalls(calls);
    }
  };

  const handleDeleteSelected = async () => {
    if (!isAdmin) return;
    try {
      for (const id of selectedCalls) {
        await deleteDoc(doc(db, 'calls', id));
      }
      const updated = calls.filter((call) => !selectedCalls.includes(call.id!));
      setCalls(updated);
      setFilteredCalls(updated);
      setSelectedCalls([]);
    } catch (error) {
      console.error('Erro ao excluir ligações:', error);
    }
  };

  const toggleHighlight = (id: string) => {
    if (!isAdmin) return;
    setHighlightedCalls((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleSelect = (id: string) => {
    if (!isAdmin) return;
    setSelectedCalls((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div>
      <Header />
      <main className="md:grid md:grid-cols-2 items-center bg-gray-100 p-4">
        <div className="bg-white p-6 rounded shadow-md w-full max-w-lg mx-auto">
          <h2 className="text-xl font-semibold mb-4 text-center">Registrar Ligações</h2>

          {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>}

          <form
  onSubmit={async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Converter data e hora da nova ligação para objeto Date
      const newCallDateTime = new Date(`${newCall.dia}T${newCall.horario}`);

      // Verificar conflitos de tempo
      const conflict = calls.some((call) => {
        const existingDateTime = new Date(`${call.dia}T${call.horario}`);
        const diff = Math.abs(existingDateTime.getTime() - newCallDateTime.getTime());
        return call.dia === newCall.dia && diff < 7 * 60 * 1000; // menos de 7 minutos
      });

      if (conflict) {
        setError('Já existe uma ligação agendada até 7 minutos antes ou depois desse horário.');
        return;
      }

      // Prosseguir com o registro se não houver conflito
      const callsRef = collection(db, 'calls');
      await addDoc(callsRef, newCall);

      const q = query(callsRef, orderBy('dia', 'asc'), orderBy('horario', 'asc'));
      const snapshot = await getDocs(q);
      const updatedCalls: Call[] = snapshot.docs.map((docItem) => ({
        ...docItem.data(),
        id: docItem.id,
      })) as Call[];

      setCalls(updatedCalls);
      setFilteredCalls(updatedCalls);
      setNewCall({
        matricula: '',
        dia: new Date().toISOString().slice(0, 10),
        horario: '',
        segundoNumero: '',
        observacao: '',
      });
      window.open(whatsappUrl); // Re-added the link opening functionality
    } catch (err) {
      console.error(err);
      setError('Erro ao registrar ligação.');
    }
  }}
  className="mb-6"
>

            <div className="flex flex-col gap-6">
              <div>
                <label className="block font-medium mb-2">Matrícula:</label>
                <input
                  type="text"
                  value={newCall.matricula}
                  onChange={(e) => setNewCall({ ...newCall, matricula: e.target.value })}
                  placeholder="Matrícula + Nome vendedor"
                  className="border w-full p-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-2">Dia para agendar:</label>
                <input
                  type="date"
                  value={newCall.dia}
                  onChange={(e) => setNewCall({ ...newCall, dia: e.target.value })}
                  className="border w-full p-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-2">Horário da ligação:</label>
                <input
                  type="time"
                  value={newCall.horario}
                  onChange={(e) => setNewCall({ ...newCall, horario: e.target.value })}
                  className="border w-full p-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-2">Segundo Número (opcional):</label>
                <input
                  type="text"
                  value={newCall.segundoNumero}
                  onChange={(e) => setNewCall({ ...newCall, segundoNumero: e.target.value })}
                  placeholder="(XX) XXXXX-XXXX"
                  className="border w-full p-2 rounded"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block font-medium mb-2">Observação (opcional):</label>
                <textarea
                  value={newCall.observacao}
                  onChange={(e) => setNewCall({ ...newCall, observacao: e.target.value })}
                  placeholder="Escreva observações sobre a ligação..."
                  className="border w-full p-2 rounded"
                  rows={3}
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Adicionar Ligação
            </button>
          </form>

        </div>
        <div className="bg-white p-6 rounded shadow-md w-full max-w-lg mx-auto mt-6 md:mt-0 md:ml-6">
          <h2 className="text-xl font-semibold mb-4 text-center">Lista de Ligações</h2>
      

          <div className="mb-4">
            <label className="block  font-medium mb-2">Filtrar por Dia:</label>
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="border w-full p-2 rounded"
            />
            <button
              onClick={applyFilter}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Aplicar Filtro
            </button>
          </div>

          <h2 className="text-lg font-semibold mb-4">Ligações Agendadas</h2>
          {filteredCalls.map((call) => (
            <div
              key={call.id}
              className={`border p-4 rounded mb-2 ${
                highlightedCalls.includes(call.id!) ? 'bg-yellow-200' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                {isAdmin && (
                  <input
                    type="checkbox"
                    checked={selectedCalls.includes(call.id!)}
                    onChange={() => toggleSelect(call.id!)}
                    className="form-checkbox h-4 w-4 text-blue-600"
                  />
                )}
                {isAdmin && (
                  <button
                    onClick={() => toggleHighlight(call.id!)}
                    className="text-sm text-blue-500 hover:underline"
                  >
                    {highlightedCalls.includes(call.id!)
                      ? 'Remover Destaque'
                      : 'Destacar'}
                  </button>
                )}
              </div>
              <p>
                <strong>Matrícula:</strong> {call.matricula}
              </p>
              <p>
  <strong>Dia:</strong>{' '}
  {call.dia.split('-').reverse().slice(0, 2).join('/')}
</p>

              <p>
                <strong>Horário:</strong> {call.horario}
              </p>
              {call.segundoNumero && (
                <p>
                  <strong>Segundo Número:</strong> {call.segundoNumero}
                </p>
              )}
              {call.observacao && (
                <p>
                  <strong>Observação:</strong> {call.observacao}
                </p>
              )}
            </div>
          ))}

          {isAdmin && (
            <div className="flex justify-between mt-4">
              <button
                onClick={handleDeleteSelected}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                disabled={selectedCalls.length === 0}
              >
                Excluir Selecionados
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CallRegister;
