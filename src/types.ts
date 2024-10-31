export type RecordJSON = {
    name: string;
    genre: string;
    yearReleased: number;
    price: number;
    _links: {
      self: {
        href: string;
      };
      record: {
        href: string;
      };
      artist: {
        href: string;
      };
    };
  };

  export type ArtistJSON = {
    name: string;
    _links: {
      self: {
        href: string;
      };
      artist: {
        href: string;
      };
      records: {
        href: string;
      };
    };
  };

  export type CartItem = {
    total: number;
    id: number; // Cart ID
    _links: {
      self: {
        href: string;
      };
      cart: {
        href: string;
      };
      records: {
        href: string;
      };
    };
  };
  
  export type CartJSON = {
    _embedded: {
      carts: CartItem[];
    };
  };

  export type RecordResponse = {
    name: string;
    genre: string;
    yearReleased: number;
    price: number;
    _links: {
      self: {
        href: string;
      };
      record: {
        href: string;
      };
      artist: {
        href: string;
      };
    };
    };

    export type RecordEntry = {
      record: RecordJSON;
      url: string;
    }
  