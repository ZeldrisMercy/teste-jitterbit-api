const Order = require('../models/Order');
const Item = require('../models/Item');

exports.createOrder = async (req, res) => {
  try {
    const { numeroPedido, "valor Total": valorTotal, dataCriacao, items } = req.body;

    const mappedItems = items.map(item => ({
      productId: item.idItem,
      quantity: item.quantidadeItem,
      price: item.valorItem
    }));

    const newOrder = await Order.create({
      orderId: numeroPedido,
      value: valorTotal,
      creationDate: dataCriacao,
      items: mappedItems
    }, {
      include: [{ model: Item, as: 'items' }]
    });

    return res.status(201).json(newOrder);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao criar o pedido.', details: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id, {
      include: [{ model: Item, as: 'items' }]
    });

    if (!order) {
      return res.status(404).json({ error: 'Pedido não encontrado.' });
    }

    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar o pedido.', details: error.message });
  }
};

exports.listOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [{ model: Item, as: 'items' }]
    });
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao listar pedidos.', details: error.message });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { "valor Total": valorTotal, dataCriacao, items } = req.body;

    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({ error: 'Pedido não encontrado.' });
    }

    await order.update({
      value: valorTotal,
      creationDate: dataCriacao
    });

    if (items && items.length > 0) {
      await Item.destroy({ where: { orderId: id } });

      const mappedItems = items.map(item => ({
        orderId: id,
        productId: item.idItem,
        quantity: item.quantidadeItem,
        price: item.valorItem
      }));

      await Item.bulkCreate(mappedItems);
    }

    const updatedOrder = await Order.findByPk(id, {
      include: [{ model: Item, as: 'items' }]
    });

    return res.status(200).json(updatedOrder);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao atualizar o pedido.', details: error.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    
    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({ error: 'Pedido não encontrado.' });
    }

    await Item.destroy({ where: { orderId: id } });
    await order.destroy();

    return res.status(200).json({ message: 'Pedido deletado com sucesso.' });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao deletar o pedido.', details: error.message });
  }
};