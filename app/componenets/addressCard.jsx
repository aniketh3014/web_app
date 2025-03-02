import { useRouter } from "next/navigation";

export const AddressCard = ({ address, isSelected, onSelect, onRemove, isSelecting, isDeleting }) => {
    const router = useRouter();

    const handleEditAddress = async () => {
        router.push(`/edit-address/${address.id}`);
    }

    const truncateText = (text, maxLength) => {
        if (text && text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    };

return (

    <div className={`bg-neutral-900/50 rounded-2xl sm:p-6 p-2 mb-2 border border-[#252525] ${isSelecting ? 'opacity-50' : ''}`}>
        <div
            className="flex items-start gap-3 cursor-pointer"
            onClick={() => !isSelecting && !isDeleting && onSelect(address.id)}
        >
            <input
                type="radio"
                checked={isSelected}
                className="mt-2 h-4 w-4 accent-green-500 focus:ring-0 cursor-pointer"
                readOnly
                disabled={isSelecting || isDeleting}
            />
            <div className="flex-grow pl-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-white text-base font-bold sm:pb-2">{address.name}</h3>
                    <span className="px-3 py-1 bg-white text-black rounded-full text-xs">
                        {address.addressType}
                    </span>
                </div>
                <p className="text-[#D9D9D9] sm:text-sm text-xs mt-1 leading-relaxed">
                    {address.mobile}<br />
                    {truncateText(`${address.address}, ${address.locality}`, 20)}<br />
                    {truncateText(address.district, 20)}<br />
                    {truncateText(address.city, 15)} - {address.pincode}
                </p>
            </div>
        </div>
        <div className="flex justify-end space-x-4 md:text-sm text-xs">
            <button
                onClick={() => {
                    if (window.confirm('Are you sure you want to remove this address?')) {
                        onRemove(address.id);
                    }
                }}
                disabled={isSelecting || isDeleting}
                className={`text-neutral-400 hover:text-white transition-colors ${(isSelecting || isDeleting) ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                {isDeleting ? 'Removing...' : 'Remove'}
            </button>
            <button
                onClick={() => handleEditAddress()}
                disabled={isSelecting || isDeleting}
                className={`text-white ${(isSelecting || isDeleting) ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                Edit
            </button>
        </div>
    </div>
);
}
