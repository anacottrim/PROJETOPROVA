export type Cars = {
    id: number;
    modelo: string;
    ano: string;
    valor: string;
    codigo: string;
    vendaLocacao: 'Venda' | 'Locação';
    img: string;
    destaque: 'sim' | 'nao';
    descricao: string; 
} //define a estrutura dos objetos que representam os carros
