import React, { useState } from "react";
import Button from "../../common/Button";
import Input from "../../common/Input";
import Modal from "../../common/Modal";
import { FaStar } from "react-icons/fa";

const ModalReview = ({ isOpen, onClose, onSubmit, isLoading, order }) => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (rating === 0) return;

        onSubmit({
            rating: rating,
            comment: comment
        });
    };

    const handleClose = () => {
        setRating(0);
        setHoverRating(0);
        setComment("");
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose} width="max-w-md">
            <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2 text-center">Beri Ulasan</h2>
                <p className="text-gray-500 text-center mb-6 text-sm">
                    Bagaimana pengalaman Anda menggunakan layanan <span className="font-semibold text-primary">{order?.service_name}</span>?
                </p>

                <form onSubmit={handleSubmit}>
                    {/* Star Rating */}
                    <div className="flex justify-center gap-2 mb-6">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                className="transition-colors transform hover:scale-110 focus:outline-none cursor-pointer"
                                onMouseEnter={() => setHoverRating(star)}
                                onMouseLeave={() => setHoverRating(0)}
                                onClick={() => setRating(star)}
                            >
                                <FaStar
                                    size={32}
                                    className={`${star <= (hoverRating || rating)
                                        ? "text-yellow-400"
                                        : "text-gray-200"
                                        } transition-colors duration-200`}
                                />
                            </button>
                        ))}
                    </div>

                    <div className="text-center mb-6 text-sm font-medium text-gray-600">
                        {rating === 1 && "Sangat Buruk"}
                        {rating === 2 && "Buruk"}
                        {rating === 3 && "Cukup"}
                        {rating === 4 && "Bagus"}
                        {rating === 5 && "Sangat Bagus!"}
                    </div>

                    {/* Comment Area */}
                    <div className="mb-6">
                        <textarea
                            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none resize-none h-32 text-gray-700 placeholder-gray-400"
                            placeholder="Ceritakan pengalaman Anda di sini... (opsional)"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3">
                        <Button
                            type="button"
                            className="flex-1 justify-center border-gray-200 text-gray-600 hover:bg-gray-50/60 p-3 shadow-sm border border-gray-200 rounded-xl"
                            onClick={handleClose}
                        >
                            Batal
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            className="flex-1 justify-center text-white shadow-lg shadow-primary/30 p-3 border border-primary rounded-xl hover:bg-primary/80   "
                            disabled={rating === 0 || isLoading}
                        >
                            {isLoading ? "Mengirim..." : "Kirim Ulasan"}
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default ModalReview;
