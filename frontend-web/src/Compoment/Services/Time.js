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
    const month = Math.floor(days / 30);
    const year = Math.floor(month / 12);

    if (year > 0){
        return `${year} Year ago`;
    } else if (month > 0) {
        return `${days} Month ago`;
    }else if (days > 0) {
        return `${days} Day ago`;
    } else if (hours > 0) {
        return `${hours} Hour ago`;
    } else if (minutes > 0) {
        return `${minutes} Minute ago`;
    }
};


function formatDate(dateString) {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
    return formattedDate;
  }


function formatDatetypeDate(dateString){
    return dateString ? dateString.split('T')[0] : '';
}
const TimeService = {
    timePassed,formatDate,formatDatetypeDate

};
export default TimeService;