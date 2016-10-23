/**
 * Copyright (c) 2010-present Abixen Systems. All rights reserved.
 *
 * This library is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation; either version 2.1 of the License, or (at your option)
 * any later version.
 *
 * This library is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more
 * details.
 */

package com.abixen.platform.core.util;



public abstract class EntityBuilder<T> {

    protected T product;

    {
        initProduct();
    }

    public T build() {
        T product = assembleProduct();
        T temp = product;
        initProduct();
        return temp;
    }

    protected abstract void initProduct();

    protected T assembleProduct() {
        return this.product;
    }

}
