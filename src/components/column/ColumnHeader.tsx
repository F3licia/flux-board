type ActionButton = {
  icon: React.ReactNode;
  label?: string;
  onClick: () => void;
};

type Props = {
  columnTitle: string;
  actions?: ActionButton[];
};

const ColumnHeader: React.FC<Props> = ({ columnTitle, actions }) => {

  return (
    <div className=" mb-8">
      <div className='flex justify-between items-end'>
        <span className="column__header__label">column</span>
        <span className="flex gap-1">
          {actions?.map((action, index) => (
            <button
              aria-label={action.label}
              key={index}
              onClick={action.onClick}
              className="column__header__button flex items-center"
            >
              {action.icon}
            </button>
          ))}
        </span>
      </div>
      <div className='border-t border-b margin-t-[1px]'>
        <h2 className="column__header__title text-xl font-semibold">{columnTitle}</h2>
      </div>
    </div>
  );
};

export default ColumnHeader;
