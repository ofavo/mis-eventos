import { Button, Form, Input, Select } from "antd";
import useRoles from "../../hooks/rolesHook";
import { createUser } from "../../services/users";
import useUserStore from "../../hooks/store";

export interface User {
    name: string;
    last_name: string;
    email: string;
    password: string;
    uuid_role: string;
    uuid_user?: string;
}

export const FormUsers = () => {
    const [form] = Form.useForm();
    const roles = useRoles().roles;
    const setRefresh = useUserStore((state: any) => state.toggleRefreshView);
    const toggleModal = useUserStore((state: any) => state.toggleModalVisible);

    const handleAddUser = async (values: User) => {
        try {
            const newUser: User = {
                name: values.name,
                last_name: values.last_name,
                email: values.email,
                password: values.password,
                uuid_role: values.uuid_role,
            };
            const response = await createUser(newUser);
            if (response) {
                setRefresh(Math.random().toString());
                toggleModal(false);
            }
            form.resetFields();
            return response
        } catch (error) {
            console.log(error);
        }

    };

    return (
        <Form form={form} onFinish={handleAddUser}>
            <Form.Item
                name="name"
                rules={[{ required: true, message: 'Por favor ingresa el nombre del usuario' }]}
            >
                <Input placeholder="Nombre" />
            </Form.Item>
            <Form.Item
                name="last_name"
                rules={[{ required: true, message: 'Por favor ingresa el apellido del usuario' }]}
            >
                <Input placeholder="Apellido" />
            </Form.Item>
            <Form.Item
                name="email"
                rules={[{ required: true, message: 'Por favor ingresa el correo del usuario' }]}
            >
                <Input placeholder="Correo" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Por favor ingresa la contraseña del usuario' }]}
            >
                <Input.Password placeholder="Contraseña" />
            </Form.Item>
            <Form.Item
                name="uuid_role"
                rules={[{ required: true, message: 'Por favor selecciona el rol del usuario' }]}
            >
                <Select placeholder="Selecciona un rol">
                    {roles.map((role: any) => (
                        <Select.Option key={role.uuid_rol} value={role.uuid_rol}>
                            {role.name}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Agregar
                </Button>
            </Form.Item>
        </Form>
    );
};