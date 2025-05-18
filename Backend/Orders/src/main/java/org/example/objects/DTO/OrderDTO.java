package org.example.objects.DTO;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class OrderDTO {
    private String id;
    private String nameOfCustomer;
    private int totalProducts;
    private BigDecimal totalPrice;

    public String getId() { return id; }

    public String getNameOfCustomer() { return nameOfCustomer; }

    public int getTotalProducts() {
        return totalProducts;
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setNameOfCustomer(String nameOfCustomer) {
        this.nameOfCustomer = nameOfCustomer;
    }

    public void setTotalProducts(int totalProducts) {
        this.totalProducts = totalProducts;
    }

    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
    }

}