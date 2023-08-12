import nodemailer from "nodemailer";
require("dotenv").config();

const sendSimpleEmail = async (dataSend) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });

    const info = await transporter.sendMail({
        from: '"Fred Foo 👻" <trunghieurider@gmail.com>',
        to: dataSend.toEmail,
        subject: "Thông tin đặt lịch khám bệnh tại My BookingCare",
        html: `<p><b>Dear ${dataSend.patientName}.</b></p>
        <p>Bạn đã đặt 1 lịch khám bệnh với bác sĩ ${dataSend.doctorName} trên nền tảng My BookingCare</p>
        <p>Thông tin lịch hẹn:</p>
        <ul>
            <li>Thời gian: <b>${dataSend.time} ${dataSend.date}</b></li>
            <li>Lý do: <b>${dataSend.reason}</b></li>
        </ul>
        <p>Để chắc chắn rằng người đặt lịch hẹn là bạn. Vui lòng nhấn vào đây: <a href="${dataSend.verifyLink}">Xác nhận</a></p>
        <p>Chân thành cảm ơn quý khách đã sử dụng dịch vụ</p>`,
    });
};

const sendConfirmEmail = async (dataSend) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });

    const info = await transporter.sendMail({
        from: '"Fred Foo 👻" <trunghieurider@gmail.com>',
        to: dataSend.patientEmail,
        subject: "Thông báo hoàn thành lịch khám bệnh tại My BookingCare",
        html: `<p><b>Dear ${dataSend.patientName}.</b></p>
        <p>Bạn đã hoàn thành lịch khám bệnh với bác sĩ ${dataSend.doctorName} trên nền tảng My BookingCare</p>
        <p>Thông tin lịch hẹn:</p>
        <ul>
            <li>Thời gian: <b>${dataSend.time} ${dataSend.date}</b></li>
            <li>Lý do: <b>${dataSend.reason}</b></li>
        </ul>
        <p><b>Thông tin hóa đơn:</b></p>
        <img src='cid:img'>
        <p>Chân thành cảm ơn quý khách đã sử dụng dịch vụ</p>`,
        attachments: [
            {
                filename: "bill.png",
                content: dataSend.image.split("base64,")[1],
                encoding: "base64",
                cid: "img",
            },
        ],
    });
};

export { sendSimpleEmail, sendConfirmEmail };
