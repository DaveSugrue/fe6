export interface IProduct{
	id: number;
	categoryId: string;
	format: string;
	name: string;
	description: string;
	iconUrl: string;
	imageUrl: string;
	price: number;
	stock: number;
	rating: string;
	show: boolean;
}