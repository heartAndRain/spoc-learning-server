var qiniu = require('qiniu')

qiniu.conf.ACCESS_KEY = '-HGKK1PCVStuaOBjxFoNwccRPcIkvxpqVfCOc1fP';
qiniu.conf.SECRET_KEY = 'fq7kLgrEoKdaEj6LgwaRpZqorUP7LnMeGNJfph4_';

const BUCKET_NAME = 'spoclearning'
const IMAGE_BUCKET_NAME = 'spoclearning-image'
const VIDEO_BUCKET_NAME = 'spoclearning-video'

const pipleline = 'spoclearning'

//构建上传策略函数
function uptoken(key: string, fileType: string) {
    
	let putPolicy = new qiniu.rs.PutPolicy(`${BUCKET_NAME}:${key}`)

	if (fileType === 'video') {

		const videoDomainName = `${VIDEO_BUCKET_NAME}:${key}`
		putPolicy = new qiniu.rs.PutPolicy(videoDomainName)
	
		let fops = "avthumb/m3u8/segtime/10/ab/128k/ar/44100/acodec/libfaac/r/30/vb/640k/vcodec/libx264/stripmeta/0"
		const saveas_key = qiniu.util.urlsafeBase64Encode(videoDomainName); 
		fops = fops+'|saveas/'+saveas_key;

		putPolicy.persistentOps = fops;
 		putPolicy.persistentPipeline = pipleline;

	} else if (fileType === 'image') {
		const videoDomainName = `${IMAGE_BUCKET_NAME}:${key}`
		putPolicy = new qiniu.rs.PutPolicy(videoDomainName)
	}

    return putPolicy.token()
}

export async function uploadFile(fileName: string, filePath: string, fileType: string) {
    const extra = new qiniu.io.PutExtra()
    const token = uptoken(fileName, fileType)

    return new Promise<any>((resolve, reject) => {
        qiniu.io.putFile(token, fileName, filePath, extra, function(err: any, ret: any) {
            if (!err) {
                // 上传成功， 处理返回值
                //console.log('上传成功')
                console.log(ret)

                resolve({key: ret.key, hash: ret.hash})
            } else {
                // 上传失败， 处理返回代码
                console.log(err)
                reject(err)
            }
        })
    })
    
}

export async function getEtag(buffer: any) {
    return new Promise((resolve, reject) => {
        try {
            _getEtag(buffer, (etag: string) => {
                resolve(etag)
            })
        } catch (e) {
            reject(e)
        }
    })
}

function _getEtag(buffer: any, callback: any){

	// 判断传入的参数是buffer还是stream还是filepath
	var mode = 'buffer';

	if(typeof buffer === 'string'){
		buffer = require('fs').createReadStream(buffer);
		mode='stream';
	}else if(buffer instanceof require('stream')){
		mode='stream';
	}

	// sha1算法
	var sha1 = function(content: any){
		var crypto = require('crypto');
		var sha1 = crypto.createHash('sha1');
		sha1.update(content);
		return sha1.digest();
	};

	// 以4M为单位分割
	var blockSize = 4*1024*1024;
	var sha1String: any = [];
	var prefix = 0x16;
	var blockCount = 0;

	switch(mode){
		case 'buffer':
			var bufferSize = buffer.length;
			blockCount = Math.ceil(bufferSize / blockSize);

			for(var i=0;i<blockCount;i++){
				sha1String.push(sha1(buffer.slice(i*blockSize,(i+1)*blockSize)));
			}
			process.nextTick(function(){
				callback(calcEtag());
			});
			break;
		case 'stream':
			var stream = buffer;
			stream.on('readable', function() {
				var chunk;
				while (chunk = stream.read(blockSize)) {
					sha1String.push(sha1(chunk));
					blockCount++;
				}
			});
			stream.on('end',function(){
				callback(calcEtag());
			});
			break;
	}

	function calcEtag(){
		if(!sha1String.length){
			return 'Fto5o-5ea0sNMlW_75VgGJCv2AcJ';
		}
		var sha1Buffer = Buffer.concat(sha1String,blockCount * 20);

		// 如果大于4M，则对各个块的sha1结果再次sha1
		if(blockCount > 1){
			prefix = 0x96;
			sha1Buffer = sha1(sha1Buffer);
		}

		sha1Buffer = Buffer.concat(
			[new Buffer([prefix]),sha1Buffer],
			sha1Buffer.length + 1
		);

		return sha1Buffer.toString('base64')
			.replace(/\//g,'_').replace(/\+/g,'-');

	}

}