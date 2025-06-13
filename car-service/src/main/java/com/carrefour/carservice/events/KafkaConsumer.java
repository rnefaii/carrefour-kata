package com.carrefour.carservice.events;

import com.carrefour.eventData.Event;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@Slf4j
@RequiredArgsConstructor
public class KafkaConsumer {

    private final CustomerEventHandler customerEventHandler;
    private final String topic = "customer-event-topic";

    @KafkaListener(topics = topic, groupId = "my-group")
    public void consume(ConsumerRecord<String,Event> consumerRecord) {

        Event event = consumerRecord.value();

        log.info("\n Consumed Event of type : {} \n published on topic at : {} \n Data value is : {}", event.type(), event.eventCreatedAt(), event.customerDto() );

        switch (consumerRecord.key()) {
            case "CREATED_CUSTOMER_EVENT":
                customerEventHandler.handleCustomerCreatedEvent(event.customerDto());
                break;
            case "UPDATED_CUSTOMER_EVENT":
                customerEventHandler.handleCustomerUpdatedEvent(event.customerDto());
                break;
            case "DELETED_CUSTOMER_EVENT":
                customerEventHandler.handleCustomerDeletedEvent(event.customerDto().id());
                break;
            default:
                log.info("Event ignored");
                break;
        }

    }
}