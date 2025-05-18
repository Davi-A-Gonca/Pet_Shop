package org.example.objects;

import org.example.objects.DTO.OrderDTO;

import java.math.BigDecimal;

public class Order {
    private String id;
    private String nameOfCustomer;
    private int totalProducts;
    private BigDecimal totalPrice;

    public Order(String id, String nameOfCustomer,
                 int totalProducts, BigDecimal totalPrice){
        this.id = id;
        this.nameOfCustomer = nameOfCustomer;
        this.totalProducts = totalProducts;
        this.totalPrice = totalPrice;
    }

    public Order(OrderDTO dto){
        id = dto.getId();
        nameOfCustomer = dto.getNameOfCustomer();
        totalProducts = dto.getTotalProducts();
        totalPrice = dto.getTotalPrice();
    }

    public Order(){}

    public String getId() { return id; }

    public String getNameOfCustomer() { return nameOfCustomer; }

    public int getTotalProducts() {
        return totalProducts;
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public void setId(String id) { this.id = id; }

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
