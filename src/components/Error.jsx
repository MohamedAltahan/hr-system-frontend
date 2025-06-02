import swal from 'sweetalert';

export const showAlert = async (type, message) => {
    if (type === 'error') {
        swal({
            icon: 'error',
            title: message,
        });
    } else if (type === 'Deleted') {
        swal({
            icon: 'success',
            title: message,
        });
    } else if (type === 'Added') {
        swal({
            icon: 'success',
            title: message,
        });
    } else if (type === 'Edit') {
        swal({
            icon: 'success',
            title: message,
        });
    }
};
