import React, { useEffect } from 'react';
import { Form, Input, Button, DatePicker, InputNumber } from 'antd';
import { createEvent, updateEvent } from '../../services/events';
import useUserStore from '../../hooks/store';
import moment from 'moment';
const { TextArea } = Input;
interface FormEventsProps {}

const FormEvents: React.FC<FormEventsProps> = () => {
  const [form] = Form.useForm();
  const setRefresh = useUserStore((state: any) => state.toggleRefreshView);
  const toggleModal = useUserStore((state: any) => state.toggleModalVisible);
  const eventData = useUserStore((state: any) => state.eventData);

  useEffect(() => {

    if (!eventData) return form.resetFields();
    if (eventData) {
    
      form.setFieldsValue({
        title: eventData.title,
        direccion: eventData.direccion,
        description: eventData.description,
        numero_asistentes: eventData.numero_asistentes,
        start_date: moment(eventData.start_date),
        end_date: moment(eventData.end_date),
      })
    }
  }, [eventData, form]);

  const onFinish = async (values: any) => {
    try {
      if (eventData) {
        let env = values;
        const response = await updateEvent(env, eventData.uuid_evento);
        if (response) {
          setRefresh(Math.random().toString());
          toggleModal(false);
        }
      } else {  
      let env = values;
      const response = await createEvent(env);
      if (response) {
        setRefresh(Math.random().toString());
        toggleModal(false);
      }
    }
    } catch (error) {
      console.log(error);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      name="eventForm"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Título"
        name="title"
        rules={[{ required: true, message: 'Por favor ingresa el título del evento!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Descripción"
        name="description"
      >
        <TextArea />
      </Form.Item>

      <Form.Item
        label="Fecha de Inicio"
        name="start_date"
        rules={[{ required: true, message: 'Por favor selecciona la fecha de inicio!' }]}
      >
        <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
      </Form.Item>

      <Form.Item
        label="Fecha de Fin"
        name="end_date"
        rules={[{ required: true, message: 'Por favor selecciona la fecha de fin!' }]}
      >
        <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
      </Form.Item>

      <Form.Item
        label="Dirección"
        name="direccion"
        rules={[{ required: true, message: 'Por favor ingresa la dirección!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Número de Asistentes"
        name="numero_asistentes"
        rules={[{ required: true, message: 'Por favor ingresa el número de asistentes!' }]}
      >
        <InputNumber min={0} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Guardar
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormEvents;