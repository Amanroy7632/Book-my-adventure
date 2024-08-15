import { useState } from "react";
import { toast } from "react-hot-toast";
import { useBusContext } from "../../../../../context/busContext.jsx";
import { useCurrentUser } from "../../../../../context/userContext.jsx";
function MediumSizedForm({
  seatNo,
  passengerNo,
  onSubmit,
  submittedForm,
  setSubmittedForm,
}) {
  const { selectedSeats, setSelectedSeats, busDetails, routeDetails } =
    useBusContext();
  const { currentUser } = useCurrentUser();
  // console.log(busDetails);
  // console.log(routeDetails);

  const [formData, setFormData] = useState({
    route: routeDetails?._id || "",
    busNumber: busDetails?.busno || "",
    name: "",
    age: "",
    gender: "",
    passengerNo: passengerNo?.toString(),
    seatNo: seatNo?.toString(),
    departureTime: routeDetails?.departureTime || "",
    arrivalTime: routeDetails?.arrivalTime || "",
    price: routeDetails?.fare || "",
    bookedBy: currentUser?._id || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      [formData.name, formData.age, formData.gender].some(
        (field) => field.trim() === ""
      )
    ) {
      toast.error("All fields are required");
      return;
    }
    if (submittedForm.includes(passengerNo)) {
      alert("passenger is already submitted");
      setFormData({
        route: routeDetails?._id || "",
        busNumber: busDetails?.busno || "",
        name: "",
        age: "",
        gender: "",
        passengerNo: passengerNo?.toString(),
        seatNo: seatNo?.toString(),
        departureTime: routeDetails?.departureTime || "",
        arrivalTime: routeDetails?.arrivalTime || "",
        price: routeDetails?.fare || "",
        bookedBy: currentUser?._id || "",
      });
      return;
    }
    onSubmit(formData);
    toast.success("Passenger has been added successfully");
    setFormData({
      route: routeDetails?._id || "",
      busNumber: busDetails?.busno || "",
      name: "",
      age: "",
      gender: "",
      passengerNo: passengerNo?.toString(),
      seatNo: seatNo?.toString(),
      departureTime: routeDetails?.departureTime || "",
      arrivalTime: routeDetails?.arrivalTime || "",
      price: routeDetails?.fare || "",
      bookedBy: currentUser?._id || "",
    });
    setSubmittedForm((prev) => [...prev, seatNo]);
  };
  const removeFromSelectHandler = (seatNo, passengerNo) => {
    if (submittedForm.includes(seatNo)) {
      return;
    }
    const newSeletedSeat = selectedSeats.filter((seat) => seat != seatNo);
    setSelectedSeats(newSeletedSeat);
  };
  return (
    <form
    
      onSubmit={handleSubmit}
      className="w-96 p-6 bg-white rounded-md shadow-md mx-auto relative"
    >
      <div>
        <h1>Enter Passenger Details</h1>
      </div>
      {!submittedForm.includes(seatNo) && (
        <div
          onClick={() => removeFromSelectHandler(seatNo, passengerNo)}
          className=" absolute top-2 right-4 bg-red-500 px-2 py-1 rounded-full text-white cursor-pointer"
        >
          X
        </div>
      )}
      <div className=" bg-green-700 p-[2px] mt-2"></div>
      <div className="mb-4 flex justify-between mt-3">
        <span className="text-gray-700 font-bold ">Passenger No:</span>
        <span className=" mr-5">{passengerNo}</span>
      </div>
      <div className="mb-4 flex justify-between mt-3">
        <span className="text-gray-700 font-bold ">Seat No:</span>
        <span className=" mr-5">{seatNo}</span>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your name"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="age">
          Age
        </label>
        <input
          type="number"
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your age"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="gender">
          Gender
        </label>
        <select
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>
            Select your gender
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      {submittedForm.includes(seatNo) ? (
        <div>
          <p>Passenger No: {passengerNo}</p>
          <p>Seat No: {seatNo}</p>
          <p>
            Status: <span className=" text-green-500">{"Confirmed ✔️"}</span>
          </p>
        </div>
      ) : (
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          disabled={submittedForm.includes(seatNo)}
        >
          Submit
        </button>
      )}
      {/* {submittedForm.includes(passengerNo)?"Submitted":"Submit"} */}
    </form>
  );
}

export default MediumSizedForm;
