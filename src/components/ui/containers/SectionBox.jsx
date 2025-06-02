import PropTypes from "prop-types";

const SectionBox = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`bg-white rounded-[16px] shadow-custom p-6 mb-5 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

SectionBox.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default SectionBox;
