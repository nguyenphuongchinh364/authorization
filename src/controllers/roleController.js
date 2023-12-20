const Role = require('../models/role'); // Import model Role

// CREATE - Tạo mới vai trò
exports.createRole = async (req, res) => {
  try {
    const { role_name, permissions } = req.body;
    const newRole = new Role({ role_name, permissions });
    const savedRole = await newRole.save();
    res.status(201).json(savedRole);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ - Lấy danh sách tất cả vai trò
exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ - Lấy thông tin vai trò theo ID
exports.getRoleById = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }
    res.status(200).json(role);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE - Cập nhật thông tin vai trò theo ID
exports.updateRoleById = async (req, res) => {
  try {
    const { role_name, permissions } = req.body;
    const updatedRole = await Role.findByIdAndUpdate(req.params.id, { role_name, permissions }, { new: true });
    if (!updatedRole) {
      return res.status(404).json({ message: 'Role not found' });
    }
    res.status(200).json(updatedRole);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE - Xóa vai trò theo ID
exports.deleteRoleById = async (req, res) => {
  try {
    const deletedRole = await Role.findByIdAndDelete(req.params.id);
    if (!deletedRole) {
      return res.status(404).json({ message: 'Role not found' });
    }
    res.status(200).json({ message: 'Role deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
