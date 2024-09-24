import { Product } from "../types/product";

export const products: Product[] = [
    {
        id: 1,
        name: 'Creme de Melaleuca',
        description: `Este creme formulado especialmente para peles sensíveis e propensas à rosácea combina o poder do óleo de melaleuca, conhecido por suas propriedades antibacterianas e anti-inflamatórias, com um protetor solar mineral que oferece uma defesa eficaz contra os raios UV, minimizando o risco de agravamento da vermelhidão.
Enriquecido com extrato de chá verde, rico em antioxidantes, o creme ajuda a proteger a pele dos danos causados pelos radicais livres, enquanto a camomila proporciona um efeito calmante e suavizante, aliviando a irritação e o desconforto associados à rosácea.
Sua textura leve e de rápida absorção promove hidratação profunda, formando uma barreira protetora que mantém a pele hidratada e saudável ao longo do dia. Ideal para uso diário, este creme não só ajuda a reduzir a aparência de vermelhidão e irritação, mas também melhora a textura da pele, promovendo um aspecto mais uniforme e radiante.`,
        shortDescription: 'Creme hidratante de melaleuca',        
price: 41.99,
        images: [
            '/rosacleo3.jpg',
            '/rosacleo2.jpg',
            '/rosacleo1.jpg',
        ]
    }
];