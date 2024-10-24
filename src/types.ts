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
  