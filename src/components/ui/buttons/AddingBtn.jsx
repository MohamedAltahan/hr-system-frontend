import PropTypes from 'prop-types';

const Button = ({ children, ...props }) => {
  return (
    <button className="addingBtn bg-[#055393] hover:bg-[#04457a]" {...props} >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Button;
