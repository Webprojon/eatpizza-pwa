//import { StaticImageData } from "next/image";

export type ItemsType = {
	id: string;
	itemId?: string;
	itemCategory: string;
	//itemImg: StaticImageData;
	itemImg: string;
	itemName: string;
	itemDescription: string | null;
	itemPrice: number;
	updateAt: Date;
	createAt: Date;
};

export type SelectedItemType = {
	[key: number]: number;
};
