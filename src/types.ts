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

  //same as ArtistResponse
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

  export type Artist = {
    name: string;
  }

  export type ArtistEntry = {
    url: string;
    artist: Artist;
  }

  export type CartItem = {
    total: number;
    id: number; //cart ID
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

export type Record = {
  name: string;
  genre: string;
  yearReleased: number;
  price: number;
}

export type RecordEntry = {
  record: {
    name: string;
    genre: string;
    yearReleased: number;
    price: number;
  };
  url: string;
};

  //same as ArtistResponse
  export type UserResponse = {
    href: string;
    first_name: string;
    last_name: string;
    email: string;
    address: string;
    username: string;
    phonenumber: string;
  };

  export type User = {
    first_name: string;
    last_name: string;
    email: string;
    address: string;
    username: string;
    phonenumber: string;
  }

  export type UserEntry = {
    url: string;
    user: User;
  }