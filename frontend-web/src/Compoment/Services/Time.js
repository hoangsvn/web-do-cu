const timePassed = (createdAt) => {
    const createdDate = new Date(createdAt);
    const currentDate = new Date();

    // Tính hiệu của hai ngày trong mili giây
    const timeDifference = currentDate - createdDate;

    // Chuyển đổi sang giây, phút, giờ, ngày
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
        return `${days} ngày trước`;
    } else if (hours > 0) {
        return `${hours} giờ trước`;
    } else if (minutes > 0) {
        return `${minutes} phút trước`;
    } else {
        return `${seconds} giây trước`;
    }
};

const TimeService = {
    timePassed

};
export default TimeService;