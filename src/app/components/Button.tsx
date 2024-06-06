type Props = {
  label: string;
  onClick: () => void;
};

const Btn = ({ label, onClick }: Props) => {
  return (
    <button onClick={onClick} className="text-white bg-red-500 border border-red-500 py-2 px-4 rounded-lg shadow-lg hover:bg-red-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75">
      {label}
    </button>
  );
};

export default Btn;