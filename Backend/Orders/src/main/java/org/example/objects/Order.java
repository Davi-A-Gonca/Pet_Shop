package org.example.objects;

import jakarta.persistence.*;
import org.example.objects.DTO.OrderDTO;

import java.math.BigDecimal;
import java.util.UUID;

@Entity
@Table(name = "db_orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(name="nameOfCustomer")
    private String nameOfCustomer;

    @Column(name="totalProducts")
    private int totalProducts;

    @Column(name="totalPrice")
    private BigDecimal totalPrice;

    public Order(UUID id, String nameOfCustomer,
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

    public UUID getId() { return id; }

    public String getNameOfCustomer() { return nameOfCustomer; }

    public int getTotalProducts() {
        return totalProducts;
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public void setId(UUID id) { this.id = id; }

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
