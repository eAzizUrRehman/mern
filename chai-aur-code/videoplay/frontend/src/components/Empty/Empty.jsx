const Empty = ({ icon, title, description }) => {
  return (
    <div className=" padding-X-2 flex-center  size-full flex-col gap-5 py-5  ">
      <div className="size-10 rounded-full bg-white p-2">
        <img src={icon} alt="" />
      </div>
      <h2 className="text-lg capitalize">{title}</h2>
      <p className="max-w-xs text-center  ">{description}</p>
    </div>
  );
};

export default Empty;
