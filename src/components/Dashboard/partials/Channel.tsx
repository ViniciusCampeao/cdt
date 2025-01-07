import React from 'react';

interface ChannelProps {
  data: {
    channel: string;
    conversions: number;
  }[];
}

const Channel: React.FC<ChannelProps> = ({ data }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Conversão por Canal de Marketing</h3>
      <ul className="list-disc ml-5">
        {data.map(channel => (
          <li key={channel.channel} className="text-gray-600">
            {channel.channel}: {channel.conversions} conversões
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Channel;
