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
        <span className="column__header__label text-box">column</span>
        <span className="flex gap-1">
          {actions?.map((action, index) => (
            <button
              aria-label={action.label}
              key={index}
              onClick={action.onClick}
              className="flex items-center"
            >
              <span className="p-2 negative-box-hover border-b-0 ">{action.icon}</span>
            </button>
          ))}
        </span>
      </div>
      <div className='margin-t-[1px] border-x-def'>
        <h2 className="column__header__title negative-text-box text-xl font-semibold">{columnTitle}</h2>
      </div>
    </div>
  );
};

export default ColumnHeader;
