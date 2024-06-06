"use client"
import ReactModal from 'react-modal';
import { useState } from 'react';
import { cars } from '@/data/CarCard';
import { Cars } from '@/data/Cars'; 
import { CustomButton } from '@/app/components/Custombutton';
import Btn from '@/app/components/Button';

const Home = () => {
 
  const [modalIsOpen, setIsOpen] = useState(false); // state para controlar se o modal está aberto ou fechado
  const [selectCar, setSelectedCar] = useState<Cars | null>(null); // state para armazenar o carro selecionado
  const [formModal, setformModal] = useState(false); // state para controlar se o modal do formulário está aberto ou fechado


  const handleOpenModal = (car: Cars) =>{ // Função para abrir o modal do carro selecionado
    setSelectedCar(car);
    setIsOpen(true);
  }
  const handleCloseModal = () => {// Função para fechar o modal
    setIsOpen(false);
    setSelectedCar(null);
  }
  const openFormModal = () => { // Função para abrir o modal do formulário de compra
    handleCloseModal();
    setformModal(true);
  }
  const closeFormModal = () => { // Função para fechar o modal do formulário de compra
    setformModal(false);
  }
  const customStyles={ // Estilos personalizados para o modal
    content:{
      top:'50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight:'-50%',
      transform: 'translate(-50%, -50%)'
    }
  }
  const handleFormSubmit = (e: React.FormEvent) => { // Função para lidar com o envio do formulário
    e.preventDefault();
    alert('Enviado!');
  }
  const [filter, setFilter] = useState<'Todos' | 'Venda' | 'Locação'>('Todos'); // state para filtrar carros por tipo (venda, locação ou todos)


  const filteredCars = filter === 'Todos' // Filtra os carros com base no tipo selecionado
    ? cars 
    : cars.filter(car => car.vendaLocacao === filter);

// state para filtrar carros em destaque por tipo (venda, locação ou todos)
  const filtrarCars = filter === 'Todos'
  ? cars.filter(car => car.destaque === 'sim')
  : cars.filter(car => car.destaque === 'sim' && car.vendaLocacao === filter);
  
  return (   // Retorna a estrutura do componente
    <main className="flex min-h-screen flex-col items-center justify-start p-24 bg-gray-100">
      <p className="mb-8 text-center text-4xl font-bold text-blue-600 font-custom shadow-lg">GALERIA DE CARROS</p>
      <div className="flex space-x-4 mb-12">
        <CustomButton onClick={() => setFilter('Venda')} label="Carros à venda" />
        <CustomButton onClick={() => setFilter('Locação')} label="Carros em locação" />
        <CustomButton onClick={() => setFilter('Todos')} label="Mostrar todos" />
      </div>
      <div className="w-full flex">
        <div className="w-1/2 p-6 ">
          <h1 className="mb-6 text-3xl font-bold text-blue-600 border-b-2 border-gray-300 pb-2 shadow-lg">EM DESTAQUES</h1>
          {filtrarCars.map((car) => (
            <div key={car.id} className="p-6 mb-6 font-medium text-gray-800 bg-white rounded-lg shadow-md flex flex-col items-center">
              <img src={car.img} alt={car.modelo} className="mb-4 w-full h-48 object-cover rounded-md cursor-pointer" onClick={() => handleOpenModal(car)} />
              <h2>{car.modelo}</h2>
          </div>
          ))}
        </div>
        <div className="w-1/2 p-6 ">
          <h1 className="mb-6 text-3xl font-bold text-blue-600 border-b-2 border-gray-300 pb-2 shadow-lg">TODOS</h1>
          {filteredCars.map((car) => (
            <div key={car.id} className="p-6 mb-6 font-medium text-gray-800 bg-white rounded-lg shadow-md flex flex-col items-center">
              <img src={car.img} alt={car.modelo} className="mb-4 w-full h-48 object-cover rounded-md cursor-pointer" onClick={() => handleOpenModal(car)} />
              <h2>{car.modelo}</h2>
            </div>
          ))}
        </div>
      </div>
            <ReactModal // Modal para exibir detalhes do carro
                isOpen={modalIsOpen}
                onRequestClose={handleCloseModal}
                style={customStyles}
                >
              {selectCar && (
              <div>
              <h2>{selectCar.modelo}</h2>
              <p>Ano: {selectCar.ano}</p>
              <p>Valor: {selectCar.valor}</p>
              <p>Código: {selectCar.codigo}</p>
              <p>Venda/Locação: {selectCar.vendaLocacao}</p>
              <p>Destaque: {selectCar.destaque}</p>
              <p>Descrição: {selectCar.descricao}</p>

              <div className='flex space-x-3'>
                <Btn onClick={handleCloseModal} label="Fechar" />
                <Btn onClick={openFormModal} label="Comprar" />
              </div>             
              </div>
              )}
          </ReactModal>
             <ReactModal // Modal para exibir formulário de compra
                isOpen={formModal}
                onRequestClose={closeFormModal}
                style={customStyles}
                >
                <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg">
                  <h2 className='text-center text-2xl font-bold mb-6 text-gray-800 '>Formulário de Compra</h2>
                  <form onSubmit={handleFormSubmit}>
                    <p>Nome completo: </p>
                    <input type="text" className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' placeholder="Seu nome completo" required/>
                    <p>Telefone: </p>
                    <input type="text" className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' placeholder="Seu telefone"required/>
                    <p>E-mail: </p>
                    <input type="email" className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' placeholder="Seu e-mail" required/>
                    <div className='flex justify-between items-center'>
                    <input type="submit" value="Enviar" className='text-white bg-red-500 border border-red-500 py-2 px-4 rounded-lg shadow-lg hover:bg-red-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75'/>
                    <Btn onClick={closeFormModal} label="Fechar" />
                    </div>
                  </form>
                </div>
              </ReactModal>
    </main>
  );
};

export default Home;