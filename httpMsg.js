const { headers } = require("./httpHeader");

function errorHandle(res, errorCode) {
	let messgae = "";
	if (errorCode == 404) {
		res.writeHead(404, headers);
		res.write(
			JSON.stringify({
				statsu: "false",
				data: "無此路由!",
			})
		);
		res.end();
		return false;
	}
	if (errorCode == 40001) {
		message = "無此資料欄位或資料欄位未填寫正確!";
	} else if (errorCode == 40002) {
		message = "JSON格式錯誤,請確認資料格式!";
	} else {
		message = "無此錯誤訊息!";
	}
	res.writeHead(400, headers);
	res.write(
		JSON.stringify({
			status: "false",
			message: message,
		})
	);
	res.end();
}

function resWriteData(res, data) {
	res.writeHead(200, headers);
	res.write(
		JSON.stringify({
			status: "sucess",
			data: data,
		})
	);
	res.end();
}

module.exports = { errorHandle, resWriteData };
