const {Wechaty, Room} = require('wechaty')


Wechaty.instance()
    .on('scan', (url, code) => {
        if (!/201|200/.test(String(code))) {
            const loginUrl = url.replace(/\/qrcode\//, '/l/')
            require('qrcode-terminal').generate(loginUrl)
        }
        console.log(url)
    })
    .on('login', user => {
        console.log(`${user} login`)
    })

    .on('friend', async function (contact, request) {
        if (request) {
            await request.accept()
            console.log(`Contact: ${contact.name()} send request ${request.hello}`)
        }
    })

    .on('message', async function (m) {
        const contact = m.from();
        const content = m.content();
        const room = m.room();

        if (room) {
            console.log(`Room: ${room.topic()} Contact: ${contact.name()} Content: ${content}`)
        } else {
            console.log(`Contact: ${contact.name()} Content: ${content}`)
        }
        if (m.self()) {
            return
        }

        if (/法拉利兰博基尼对骂群（不走程序）/.test(room)) {
            if (/签到/.test(content)){
                m.say("💖尊贵用户💖:"+room+"签到成功!积分+10");
                m.say("请回复查询积分");
            }
            if (/查/.test(content)){
                let bb=["aa","bb","cc","dd","Ee"];
                m.say(bb[Math.floor((Math.random()*bb.length))]);
            }
            if (/你也要听故事吗/.test(contact)){
                let bb=["SB","NMSl","CNM","DSB","WCNM"];
                m.say("@你也要听故事吗"+bb[Math.floor((Math.random()*bb.length))]);
            }

        }
        if (/out/.test(content)) {
            let keyroom = await Room.find({topic: "test"})
            if (keyroom) {
                await keyroom.say("has been removed from the room", contact)
                await keyroom.del(contact)
            }
        }
    })

    .init()