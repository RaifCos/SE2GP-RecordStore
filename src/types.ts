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

export type Artist = {
  name: string;
}

export type ArtistEntry = {
  artist: Artist;
  url: string;
}

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
  record: RecordJSON[];
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

export type Cart = {
  id: number;
  items: string[];
  totalPrice: number;
  _links?: {
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
    carts: Cart;
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

export type UserJSON = {
  id: number; 
  username: string;
  password: string; 
  role: string; 
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  accountCreationDate: string; 
  cart: any | null; 
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

export type User = {
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  username: string;
  phonenumber: string;
}

export type UserEntry = {
  user: User;
}

export interface UserResponse {
  id: number;
  username: string;
  password: string;
  role: string;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  cart: null | any;
}


