import { message } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';

function AddForm({ isShow, closeModal, product }) {
    const [variations, setVariations] = useState([]);

    useEffect(() => {
        axios
            .get(
                `http://localhost:8080/api/products/${product?.id}/product_variations`,
            )
            .then((response) => {
                setVariations(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [product]);

    const [formData, setForm] = useState({
        variation: variations[0],
        quantity: null,
    });

    const handleChangeForm = (e) => {
        setForm({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const variation = variations.find((v) => v.id == formData.variation);

        try {
            await axios.put('http://localhost:8080/api/product_variations', {
                ...variation,
                quantity: variation.quantity + formData.quantity,
            });
            setForm({
                variation: variations[0],
                quantity: null,
            });

            message.success('Thêm thành công');
            closeModal();
        } catch (error) {
            console.log(error);
            message.error('Thêm bị lỗi');
        }
    };

    return (
        isShow && (
            <div className="fixed inset-0 flex justify-center items-center">
                <div className="absolute z-[1] bg-white px-[24px] py-[24px] w-[60rem] rounded-[10px]">
                    <h1 className="text-[20px] font-[600] mb-[20px]">
                        {product.name}
                    </h1>
                    <form
                        onSubmit={handleSubmit}
                        className="flex items-center gap-[16px]"
                    >
                        <select
                            className="px-4 py-2 border border-gray-300  ml-[12px] rounded"
                            value={formData.variation}
                            name={'variation'}
                            onChange={handleChangeForm}
                            required
                        >
                            {variations.map((v) => (
                                <option key={v.id} value={v.id}>
                                    {v.name}
                                </option>
                            ))}
                        </select>
                        <input
                            type="number"
                            value={formData.quantity}
                            name="quantity"
                            onChange={handleChangeForm}
                            required
                            placeholder="Nhập số lượng"
                        />
                        <button className="px-[8px] py-[6px] rounded bg-[blue] text-white">
                            Thêm
                        </button>
                    </form>

                    <button
                        className="px-[12px] mt-[16px] rounded text-white bg-[red] py-[6px] "
                        onClick={closeModal}
                    >
                        Hủy
                    </button>
                </div>
                <div className="absolute inset-0 bg-[#000] opacity-[0.08]"></div>
            </div>
        )
    );
}

export default AddForm;
