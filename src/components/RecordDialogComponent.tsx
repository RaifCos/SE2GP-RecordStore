import DialogContent from "@mui/material/DialogContent";
import { RecordResponse } from "../types";

type DialogFormProps = {
  record: RecordResponse;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function CarDialogContent({ record, handleChange }: DialogFormProps) {
  return (
    <>
      <DialogContent>
        <input
          placeholder="Name"
          name="name"
          value={record.name}
          onChange={handleChange}
        />
        <br />
        <input
          placeholder="Genre"
          name="genre"
          value={record.genre}
          onChange={handleChange}
        />
        <br />
        <input
          placeholder="Year Released"
          name="colour"
          value={car.colour}
          onChange={handleChange}
        />
        <br />
        <input
          placeholder="Year"
          name="registrationYear"
          value={car.registrationYear}
          onChange={handleChange}
        />
        <br />
        <input
          placeholder="Reg.nr."
          name="registration"
          value={car.registration}
          onChange={handleChange}
        />
        <br />
        <input
          placeholder="Price"
          name="price"
          value={car.price}
          onChange={handleChange}
        />
        <br />
      </DialogContent>
    </>
  );
}
export default CarDialogContent;
