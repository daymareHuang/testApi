const request = require('supertest');
// const api = require('/你的api') or '要測試的api網址' ;
const assert = require('assert');

// 1.
describe('API 測試: GET /class', function() {
    it('回傳 200 還有課程', async function() {
        const res = await request(api).get('/class');
        assert.strictEqual(res.statusCode, 200);
        assert.strictEqual(res.body.Cid, 1);
        assert.strictEqual(res.body.name, "計算機概論");
        assert.strictEqual(res.body.summary, "theSummary");
        assert.strictEqual(res.body.weekday, "Monday");
        assert.strictEqual(res.body.time.startTime, 1300);
        assert.strictEqual(res.body.time.endTime, 1500);
        assert.strictEqual(res.body.place, "北棟 101 教室");
        assert.strictEqual(res.body.professor.id, 1);
        assert.strictEqual(res.body.professor.name, "X教授");
        assert.strictEqual(res.body.professor.email, "X@gmail.com");
        assert.strictEqual(res.body.professor.phone, "02-0000-0000#123");
        assert.strictEqual(res.body.credit, 2);
    });
});

// 2.
describe('API 測試: POST /class', function(){
    it('回傳 201 還有剛剛輸入的值跟ID', async function() {
        const newClass = {
            className: "計算機概論",
            summary: "theSummary",
            weekday: "Monday",
            time: {
                "startTime": 1300,
                "endTime": 1500
            },
            place: "北棟 102 教室",
            professor: {
                id: 2,
                name: "S教授",
                email: "S@gmail.com",
                phone: "02-0000-0000#456"
            },
            credict: 2
        }
        const res = await request(api)
            .post('/class')
            .send(newClass)
            .set('Accept', 'application/json');
        
        assert.strictEqual(res.statusCode, 201);
        assert.strictEqual(res.body.Cid, 2);
        assert.strictEqual(res.body.name, "計算機概論");
        assert.strictEqual(res.body.summary, "theSummary");
        assert.strictEqual(res.body.weekday, "Monday");
        assert.strictEqual(res.body.time.startTime, 1300);
        assert.strictEqual(res.body.time.endTime, 1500);
        assert.strictEqual(res.body.place, "北棟 102 教室");
        assert.strictEqual(res.body.professor.id, 2);
        assert.strictEqual(res.body.professor.name, "S教授");
        assert.strictEqual(res.body.professor.email, "S@gmail.com");
        assert.strictEqual(res.body.professor.phone, "02-0000-0000#456");
        assert.strictEqual(res.body.credit, 2); 
    });

    it('缺少要填寫的資料 回傳 400', async function() {
        const res = await request(api)
            .post('/class')
            .send({classname: "計算機概論"})
            .set('Accept', 'application/json');

            assert.strictEqual(res.statusCode, 400);
            assert.strictEqual(res.body.error, 'Need to fill the other data');
    });
})

// 3.
describe('DELETE /class/:id', function() {
    it('成功刪除存在的使用者', async function(){
        const res = await request(api).delete('/class/1');
        assert.strictEqual(res.statusCode, 200);
        assert.strictEqual(res.body.Cid, 1);
        assert.strictEqual(res.body.name, "計算機概論");
        assert.strictEqual(res.body.summary, "theSummary");
        assert.strictEqual(res.body.weekday, "Monday");
        assert.strictEqual(res.body.time.startTime, 1300);
        assert.strictEqual(res.body.time.endTime, 1500);
        assert.strictEqual(res.body.place, "北棟 101 教室");
        assert.strictEqual(res.body.professor.id, 1);
        assert.strictEqual(res.body.professor.name, "X教授");
        assert.strictEqual(res.body.professor.email, "X@gmail.com");
        assert.strictEqual(res.body.professor.phone, "02-0000-0000#123");
        assert.strictEqual(res.body.credit, 2);
    });

    it('刪除不存在的使用者 404', async function(){
        const res = await request(api).delete('/class/100');
        assert.strictEqual(res.statusCode, 404);
        assert.strictEqual(res.body.error, 'Class not found');
    });
})