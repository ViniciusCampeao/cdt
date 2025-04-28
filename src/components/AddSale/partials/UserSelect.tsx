import React from 'react';

interface Props {
  users: Array<{ id: string; name: string }>;
  selectedName: string;
  setSelectedName: (name: string) => void;
}

const UserSelect: React.FC<Props> = ({ users, selectedName, setSelectedName }) => (
  <div className="mb-4">
    <label className="block text-lg font-medium mb-2">Escolha o vendedor:</label>
    <select
      value={selectedName}
      onChange={(e) => setSelectedName(e.target.value)}
      className="border w-full p-2 rounded"
      required
    >
      <option value="">Selecione</option>
      {users.map((user) => (
        <option key={user.id} value={user.name}>
          {user.name}
        </option>
      ))}
    </select>
  </div>
);

export default UserSelect;