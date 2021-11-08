exports.mailRegisterTemplate = (data) => `<body>
<table border="0" cellpadding="0" cellspacing="0" width="100%"
    style="text-size-adjust: 100%; border-collapse: collapse !important;">
    <tbody>
        <tr>
            <td bgcolor="#FFA73B" align="center" style="text-size-adjust: 100%;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%"
                    style="text-size-adjust: 100%; border-collapse: collapse !important; max-width: 600px;">
                    <tbody>
                        <tr>
                            <td align="center" valign="top" style="text-size-adjust: 100%; padding: 40px 10px;">
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
        <tr>
            <td bgcolor="#FFA73B" align="center" style="text-size-adjust: 100%; padding: 0px 10px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%"
                    style="text-size-adjust: 100%; border-collapse: collapse !important; max-width: 600px;">
                    <tbody>
                        <tr>
                            <td bgcolor="#ffffff" align="center" valign="top"
                                style="text-size-adjust: 100%; padding: 40px 20px 20px; border-radius: 4px 4px 0px 0px; color: rgb(17, 17, 17); font-family: Lato, Helvetica, Arial, sans-serif; font-size: 48px; letter-spacing: 4px; line-height: 48px;">
                                <h1 style="font-size: 48px; font-weight: 400;">Welcome to Class Room!</h1><img
                                    src="https://img.icons8.com/clouds/100/000000/handshake.png" width="125"
                                    height="120"
                                    style="border: 0px; height: auto; line-height: 48px; outline: none; display: block;">
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
        <tr>
            <td bgcolor="#f4f4f4" align="center" style="text-size-adjust: 100%; padding: 0px 10px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%"
                    style="text-size-adjust: 100%; border-collapse: collapse !important; max-width: 600px;">
                    <tbody>
                        <tr>
                            <td bgcolor="#ffffff" align="left"
                                style="text-size-adjust: 100%; padding: 20px 30px 40px; color: rgb(102, 102, 102); font-family: Lato, Helvetica, Arial, sans-serif; font-size: 18px; line-height: 25px;">
                                <p style="margin: 0px;">We're excited to have you get started. First, you need to
                                    confirm your account. Just press the button below.</p>
                            </td>
                        </tr>
                        <tr>
                            <td bgcolor="#ffffff" align="left" style="text-size-adjust: 100%;">
                                <table width="100%" border="0" cellspacing="0" cellpadding="0"
                                    style="text-size-adjust: 100%; border-collapse: collapse !important;">
                                    <tbody>
                                        <tr>
                                            <td bgcolor="#ffffff" align="center"
                                                style="text-size-adjust: 100%; padding: 20px 30px 60px;">
                                                <table border="0" cellspacing="0" cellpadding="0"
                                                    style="text-size-adjust: 100%; border-collapse: collapse !important;">
                                                    <tbody>
                                                        <tr>
                                                            <td align="center" bgcolor="#FFA73B"
                                                                style="text-size-adjust: 100%; border-radius: 3px;">
                                                                <a href="${data.link}"
                                                                    target="_blank"
                                                                    style="text-size-adjust: 100%; font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: rgb(255, 255, 255); text-decoration-line: none; padding: 15px 25px; border-radius: 2px; border: 1px solid rgb(255, 167, 59); display: inline-block;">Confirm
                                                                    Account</a></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td bgcolor="#ffffff" align="left"
                                style="text-size-adjust: 100%; padding: 0px 30px; color: rgb(102, 102, 102); font-family: Lato, Helvetica, Arial, sans-serif; font-size: 18px; line-height: 25px;">
                                <p style="margin: 0px;">If that doesn't work, copy and paste the following link in
                                    your browser:</p>
                            </td>
                        </tr>
                        <tr>
                            <td bgcolor="#ffffff" align="left"
                                style="text-size-adjust: 100%; padding: 20px 30px; color: rgb(102, 102, 102); font-family: Lato, Helvetica, Arial, sans-serif; font-size: 18px; line-height: 25px;">
                                <p style="margin: 0px;"><a href="file:///C:/Users/ASUS/Downloads/download.html#"
                                        target="_blank"
                                        style="text-size-adjust: 100%; color: rgb(255, 167, 59);">${data.link}</a>
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td bgcolor="#ffffff" align="left"
                                style="text-size-adjust: 100%; padding: 0px 30px 20px; color: rgb(102, 102, 102); font-family: Lato, Helvetica, Arial, sans-serif; font-size: 18px; line-height: 25px;">
                                <p style="margin: 0px;">If you have any questions, just reply to this email—we're
                                    always happy to help out.</p>
                            </td>
                        </tr>
                        <tr>
                            <td bgcolor="#ffffff" align="left"
                                style="text-size-adjust: 100%; padding: 0px 30px 40px; border-radius: 0px 0px 4px 4px; color: rgb(102, 102, 102); font-family: Lato, Helvetica, Arial, sans-serif; font-size: 18px; line-height: 25px;">
                                <p style="margin: 0px;">Cheers,<br>BBB Team</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
        <tr>
            <td bgcolor="#f4f4f4" align="center" style="text-size-adjust: 100%; padding: 30px 10px 0px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%"
                    style="text-size-adjust: 100%; border-collapse: collapse !important; max-width: 600px;">
                    <tbody>
                        <tr>
                            <td bgcolor="#FFECD1" align="center"
                                style="text-size-adjust: 100%; padding: 30px; border-radius: 4px; color: rgb(102, 102, 102); font-family: Lato, Helvetica, Arial, sans-serif; font-size: 18px; line-height: 25px;">
                                <h2 style="font-size: 20px; font-weight: 400; color: rgb(17, 17, 17); margin: 0px;">
                                    Need more help?</h2>
                                <p style="margin: 0px;"><a href="file:///C:/Users/ASUS/Downloads/download.html#"
                                        target="_blank"
                                        style="text-size-adjust: 100%; color: rgb(255, 167, 59);">We’re here to help
                                        you out</a></p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
        <tr>
            <td bgcolor="#f4f4f4" align="center" style="text-size-adjust: 100%; padding: 0px 10px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%"
                    style="text-size-adjust: 100%; border-collapse: collapse !important; max-width: 600px;">
                    <tbody>
                        <tr>
                            <td bgcolor="#f4f4f4" align="left"
                                style="text-size-adjust: 100%; padding: 0px 30px 30px; color: rgb(102, 102, 102); font-family: Lato, Helvetica, Arial, sans-serif; font-size: 14px; line-height: 18px;">
                                <br>
                                <p style="margin: 0px;">If these emails get annoying, please feel free to&nbsp;<a
                                        href="file:///C:/Users/ASUS/Downloads/download.html#" target="_blank"
                                        style="text-size-adjust: 100%; color: rgb(17, 17, 17); font-weight: 700;">unsubscribe</a>.
                                </p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>



</body>`;

exports.mailForgetPassWordTemplate = (data) => `<body>
<table border="0" cellpadding="0" cellspacing="0" width="100%"
    style="text-size-adjust: 100%; border-collapse: collapse !important;">
    <tbody>
        <tr>
            <td bgcolor="#FFA73B" align="center" style="text-size-adjust: 100%;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%"
                    style="text-size-adjust: 100%; border-collapse: collapse !important; max-width: 600px;">
                    <tbody>
                        <tr>
                            <td align="center" valign="top" style="text-size-adjust: 100%; padding: 40px 10px;">
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
        <tr>
            <td bgcolor="#FFA73B" align="center" style="text-size-adjust: 100%; padding: 0px 10px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%"
                    style="text-size-adjust: 100%; border-collapse: collapse !important; max-width: 600px;">
                    <tbody>
                        <tr>
                            <td bgcolor="#ffffff" align="center" valign="top"
                                style="text-size-adjust: 100%; padding: 40px 20px 20px; border-radius: 4px 4px 0px 0px; color: rgb(17, 17, 17); font-family: Lato, Helvetica, Arial, sans-serif; font-size: 48px; letter-spacing: 4px; line-height: 48px;">
                                <h1 style="font-size: 48px; font-weight: 400;">Reset Your Password!</h1><img
                                    src="https://img.icons8.com/clouds/100/000000/handshake.png" width="125"
                                    height="120"
                                    style="border: 0px; height: auto; line-height: 48px; outline: none; display: block;">
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
        <tr>
            <td bgcolor="#f4f4f4" align="center" style="text-size-adjust: 100%; padding: 0px 10px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%"
                    style="text-size-adjust: 100%; border-collapse: collapse !important; max-width: 600px;">
                    <tbody>
                        <tr>
                            <td bgcolor="#ffffff" align="left"
                                style="text-size-adjust: 100%; padding: 20px 30px 40px; color: rgb(102, 102, 102); font-family: Lato, Helvetica, Arial, sans-serif; font-size: 18px; line-height: 25px;">
                                <p style="margin: 0px;">
                                We heard that you lost your Class Room password. Sorry about that!
                                
                                But don’t worry! You can use the following button to reset your password:. Just press the button below.</p>
                            </td>
                        </tr>
                        <tr>
                            <td bgcolor="#ffffff" align="left" style="text-size-adjust: 100%;">
                                <table width="100%" border="0" cellspacing="0" cellpadding="0"
                                    style="text-size-adjust: 100%; border-collapse: collapse !important;">
                                    <tbody>
                                        <tr>
                                            <td bgcolor="#ffffff" align="center"
                                                style="text-size-adjust: 100%; padding: 20px 30px 60px;">
                                                <table border="0" cellspacing="0" cellpadding="0"
                                                    style="text-size-adjust: 100%; border-collapse: collapse !important;">
                                                    <tbody>
                                                        <tr>
                                                            <td align="center" bgcolor="#FFA73B"
                                                                style="text-size-adjust: 100%; border-radius: 3px;">
                                                                <a href="${data.link}"
                                                                    target="_blank"
                                                                    style="text-size-adjust: 100%; font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: rgb(255, 255, 255); text-decoration-line: none; padding: 15px 25px; border-radius: 2px; border: 1px solid rgb(255, 167, 59); display: inline-block;">
                                                                    Reset Your Password
                                                            </a></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td bgcolor="#ffffff" align="left"
                                style="text-size-adjust: 100%; padding: 0px 30px; color: rgb(102, 102, 102); font-family: Lato, Helvetica, Arial, sans-serif; font-size: 18px; line-height: 25px;">
                                <p style="margin: 0px;">If that doesn't work, copy and paste the following link in
                                    your browser:</p>
                            </td>
                        </tr>
                        <tr>
                            <td bgcolor="#ffffff" align="left"
                                style="text-size-adjust: 100%; padding: 20px 30px; color: rgb(102, 102, 102); font-family: Lato, Helvetica, Arial, sans-serif; font-size: 18px; line-height: 25px;">
                                <p style="margin: 0px;"><a href="file:///C:/Users/ASUS/Downloads/download.html#"
                                        target="_blank"
                                        style="text-size-adjust: 100%; color: rgb(255, 167, 59);">${data.link}</a>
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td bgcolor="#ffffff" align="left"
                                style="text-size-adjust: 100%; padding: 0px 30px 20px; color: rgb(102, 102, 102); font-family: Lato, Helvetica, Arial, sans-serif; font-size: 18px; line-height: 25px;">
                                <p style="margin: 0px;">If you have any questions, just reply to this email—we're
                                    always happy to help out.</p>
                            </td>
                        </tr>
                        <tr>
                            <td bgcolor="#ffffff" align="left"
                                style="text-size-adjust: 100%; padding: 0px 30px 40px; border-radius: 0px 0px 4px 4px; color: rgb(102, 102, 102); font-family: Lato, Helvetica, Arial, sans-serif; font-size: 18px; line-height: 25px;">
                                <p style="margin: 0px;">Cheers,<br>BBB Team</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
        <tr>
            <td bgcolor="#f4f4f4" align="center" style="text-size-adjust: 100%; padding: 30px 10px 0px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%"
                    style="text-size-adjust: 100%; border-collapse: collapse !important; max-width: 600px;">
                    <tbody>
                        <tr>
                            <td bgcolor="#FFECD1" align="center"
                                style="text-size-adjust: 100%; padding: 30px; border-radius: 4px; color: rgb(102, 102, 102); font-family: Lato, Helvetica, Arial, sans-serif; font-size: 18px; line-height: 25px;">
                                <h2 style="font-size: 20px; font-weight: 400; color: rgb(17, 17, 17); margin: 0px;">
                                    Need more help?</h2>
                                <p style="margin: 0px;"><a href="file:///C:/Users/ASUS/Downloads/download.html#"
                                        target="_blank"
                                        style="text-size-adjust: 100%; color: rgb(255, 167, 59);">We’re here to help
                                        you out</a></p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
        <tr>
            <td bgcolor="#f4f4f4" align="center" style="text-size-adjust: 100%; padding: 0px 10px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%"
                    style="text-size-adjust: 100%; border-collapse: collapse !important; max-width: 600px;">
                    <tbody>
                        <tr>
                            <td bgcolor="#f4f4f4" align="left"
                                style="text-size-adjust: 100%; padding: 0px 30px 30px; color: rgb(102, 102, 102); font-family: Lato, Helvetica, Arial, sans-serif; font-size: 14px; line-height: 18px;">
                                <br>
                                <p style="margin: 0px;">If these emails get annoying, please feel free to&nbsp;<a
                                        href="file:///C:/Users/ASUS/Downloads/download.html#" target="_blank"
                                        style="text-size-adjust: 100%; color: rgb(17, 17, 17); font-weight: 700;">unsubscribe</a>.
                                </p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>



</body>`;
