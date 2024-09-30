const OfferCard = ({ details }) => {
  return (
    <div
      className={`h-36 w-64 rounded-xl flex p-3 cursor-pointer flex-shrink-0  ${details.className}`}
    >
      <div className="h-full grid place-content-center px-2">
        <img className="rounded-full w-24" src={details.imgSrc} alt="" />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-xs px-1 py-[1px] bg-[#ffffff4c] rounded-full w-10 grid place-content-center">
          {details.vehicle}
        </p>
        <h3 className="font-bold text-base leading-5">{details.offer}</h3>
        <p className="text-xs">{details.validity}</p>
        <div className="flex gap-3 items-center">
          <p className="grid place-content-center bg-[#ffffff4c] h-6 font-semibold px-2 rounded-sm border border-dashed border-white text-xs">
            {details.coupanCode}
          </p>
          <i className="fa-regular fa-copy text-xl"></i>
        </div>
      </div>
    </div>
  );
};

export default OfferCard;
