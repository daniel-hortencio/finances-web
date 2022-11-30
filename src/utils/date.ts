export const dateFormat = {
    today: () => {
        var d = new Date(),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    },
    d_m_y: (date: string) => {
        let date_without_timestamp = date.split("T")[0]

        const [year, month, day] = date_without_timestamp.split("-")

        return [day, month, year].join("/")
    },
    d_m: (date: string) => {
        let date_without_timestamp = date.split("T")[0]

        const [, month, day] = date_without_timestamp.split("-")

        return [day, month].join("/")
    },
    y_m_d: (date: string) => {
        let date_without_timestamp = date.split("T")[0]

        const [year, month, day] = date_without_timestamp.split("-")

        return [year, month, day].join("-")
    },
}