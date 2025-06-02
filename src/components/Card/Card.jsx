import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Card = ({ grid, pages, tittle }) => {
  
  return (
    <div className="py-5 px-5">
      <h2 className="text-2xl">{tittle}</h2>
      <div   className={`grid ${
    grid === 2
      ? 'grid-cols-2'
    :grid === 3
      ? 'grid-cols-3'
      : grid === 5
      ? 'grid-cols-5'
      : grid === 4
      ? 'grid-cols-4'
      : ''
  } w-[95%] py-8 mx-auto gap-3 gap-y-20`}
>
        {pages?.map((page, index) => (
          <Link to={`${page.route}`} key={index}>
            <div className="max-w-sm text-center flex flex-col justify-center items-center p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 transform transition-all duration-300 ease-in-out hover:-translate-y-3">
              <div className="flex flex-col justify-center items-center gap-3">
                <div>
                  <img src= {page.icon} className="w-20 h-20 mx-auto pb-5 object-contain" alt={page.title} />
                  <h2 className="text-[#0C0A34] text-[18px]">{page.title}</h2>
                 </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

// Adding PropTypes validation for the component's props
Card.propTypes = {
  grid: PropTypes.string.isRequired, // Ensures `grid` is a number
  tittle: PropTypes.string.isRequired, // Ensures `tittle` is a string
  pages: PropTypes.arrayOf( // Ensures `pages` is an array of objects
    PropTypes.shape({
      icon: PropTypes.element.isRequired, // Ensures `icon` is a React element
      title: PropTypes.string.isRequired, // Ensures `title` is a string
      route: PropTypes.string.isRequired, // Ensures `to` is a string (the URL to navigate to)
    })
  ).isRequired,
};

export default Card;
