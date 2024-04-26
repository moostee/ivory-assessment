function sockMerchant(socks) {

    const sockCounts = {};
    let pairs = 0;

    socks.forEach(sock => {
        sockCounts[sock] = (sockCounts[sock] || 0) + 1;
    });

    Object.values(sockCounts).forEach(count => {
        pairs += Math.floor(count / 2);
    });

    return pairs;
}

const socks = [1, 2, 1, 2, 1, 3, 2, 4, 4];
console.log(sockMerchant(socks)); 