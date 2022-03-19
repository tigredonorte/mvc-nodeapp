import { Request, Response } from 'express';

import { ProductsModel } from './products.model';

const model = new ProductsModel();
const views = 'modules/shop/products/views';

export class ProductsController {
  async list(req: Request<any>, res: Response<any>) {
    const products = await model.getProducts();
    res.render(`${views}/index`, {
      docTitle: 'My shop',
      pageName: req.originalUrl,
      products,
      hasProducts: products.length > 0,
    });
  }

  async show(req: Request<any>, res: Response<any>) {
    const product = await model.getProduct(req.params.id);
    if (!product) {
      return res.render('modules/index/views/404', {
        docTitle: 'Product not found',
        docContent: `The product that your looking for doesn't exists`, // eslint-disable-line
      });
    }
    res.render(`${views}/product-details`, {
      docTitle: product.title,
      pageName: req.originalUrl,
      product,
    });
  }

  add(req: Request<any>, res: Response<any>) {
    res.render(`${views}/add-product`, {
      docTitle: 'Add Products',
      pageName: req.originalUrl,
      product: {},
    });
  }

  async addPost(req: Request<any>, res: Response<any>) {
    await model.addProduct(req.body);
    res.redirect('/shop');
  }

  async edit(req: Request<any>, res: Response<any>) {
    const product = await model.getProduct(req.params.id);
    if (!product) {
      return res.end();
    }
    res.render(`${views}/add-product`, {
      docTitle: 'Add Products',
      pageName: req.originalUrl,
      product,
    });
  }

  async editPatch(req: Request<any>, res: Response<any>) {
    await model.editProduct(req.params.id, req.body);
    res.redirect('/shop');
  }

  async delete(req: Request<any>, res: Response<any>) {
    await model.deleteProduct(req.params.id);
    res.redirect('/shop');
  }
}