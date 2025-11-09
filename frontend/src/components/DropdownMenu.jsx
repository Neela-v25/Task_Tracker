function DropdownMenu({ menuList, position, onClose }) {
  const handleClick = (e, menuItem) => {
    e.stopPropagation();
    onClose();
    menuItem.onClick(menuItem.action);
  };

  return (
    <div
      className={`absolute ${position} bg-white h-fit w-50 p-3 rounded shadow-md z-40`}
    >
      <menu>
        {menuList.map((item) => (
          <li
            key={item.menu}
            className="hover:bg-gray-100 cursor-pointer p-1 z-40"
            onClick={(e) => handleClick(e, item)}
          >
            {item.menu}
          </li>
        ))}
      </menu>
    </div>
  );
}

export default DropdownMenu;
