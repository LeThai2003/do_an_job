module.exports = (query) => {
    const filterStatus = [
        {
            name: "Tất cả",
            status: "",
            class: ""
        },
        {
            name: "Hết hạn",
            status: "expired",
            class: ""
        },
        {
            name: "Chưa hết hạn",
            status: "unexpired",
            class: ""
        },
        {
            name: "Dừng tuyển",
            status: "inactive",
            class: ""
        },
        {
            name: "Đang tuyển",
            status: "active",
            class: ""
        },
    ]

    if(query.status)
    {
        const index = filterStatus.findIndex(item => item.status == query.status);
        filterStatus[index].class = "active";
    }
    else
    {
        filterStatus[0].class = "active";
    }

    return filterStatus;
}