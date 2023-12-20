
const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    role_name: { type: String, required: true, unique: true },
    permissions: {
        books: {
            create: { type: Boolean, default: false },
            read: { type: Boolean, default: false },
            update: { type: Boolean, default: false },
            delete: { type: Boolean, default: false }
        },
        users: {
            create: { type: Boolean, default: false },
            read: { type: Boolean, default: false },
            update: { type: Boolean, default: false },
            delete: { type: Boolean, default: false }
        },
        // Thêm các model khác và quyền hạn tương ứng
    }
    // Các trường khác nếu cần thiết
});

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;


