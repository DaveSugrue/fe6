export interface ITicker{
	XXRPZEUR: ITickerData;
}

export interface ITickerData{
    /*
    ask: Array<number>;
    bid: Array<number>;
    lastTradeClosed: Array<number>;
    volume: Array<number>;
    volumeWeightedAveragePrice: Array<number>;
    numberOfTrades: Array<number>;
    low: Array<number>;
    high: Array<number>;
    openPrice: number;
    */
    
	a: Array<number>;
    b: Array<number>;
    c: Array<number>;
    v: Array<number>;
    p: Array<number>;
    t: Array<number>;
    l: Array<number>;
    h: Array<number>;
    o: number;
}

export interface IAskBid{
	price: number;
	wholeLotVolume: number;
	lotVolume: number;
}

export interface ILastTrade{
	price: number;
	volume: number;
}

export interface IVolume{
	today: number;
	last24Hours: number;
}