import storage from './config';
import { getStorage, ref, deleteObject } from 'firebase/storage';

export const deleteFileFirebase = (fileName) => {
    const storage = getStorage();

    // Create a reference to the file to delete
    const desertRef = ref(storage, `images/${fileName}`);

    // Delete the file
    deleteObject(desertRef)
        .then(() => {
            console.log('đã xóa thành công');
        })
        .catch((error) => {
            // Uh-oh, an error occurred!
        });
};
