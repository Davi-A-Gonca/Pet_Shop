package org.example.objects.DTO;

import java.util.UUID;

public class DogFoodDTO extends ConsumableDTO{
    private UUID id;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }
}
