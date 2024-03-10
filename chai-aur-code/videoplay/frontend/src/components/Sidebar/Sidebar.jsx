import { Link } from "react-router-dom";
import { menus, bottomMenus } from "../../constants";

const Sidebar = () => {
  return (
    <section className=" paddingY white-border flex-between-center  h-full flex-col gap-10  border-r  bg-secondary-color     pr-5  ">
      <ul className="w-full ">
        {menus.map((menu) => {
          return (
            <li
              key={menu.id}
              className=" border-br  white-border mt-2   rounded bg-tertiary-color  px-4  py-2   hover:bg-primary-color "
            >
              <Link to={menu.path} className=" flex-start-center gap-3  ">
                <img src={menu.logo} alt={menu.title} width={20} height={20} />
                <span className="shrink-0">{menu.title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
      <ul className="w-full ">
        {bottomMenus.map((menu) => {
          return (
            <li
              key={menu.id}
              className=" border-br  white-border mt-2   rounded bg-tertiary-color  px-4  py-2   hover:bg-primary-color "
            >
              <Link to={menu.path} className=" flex-start-center gap-3">
                <img src={menu.logo} alt={menu.title} width={20} height={20} />
                <span className="shrink-0">{menu.title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Sidebar;
