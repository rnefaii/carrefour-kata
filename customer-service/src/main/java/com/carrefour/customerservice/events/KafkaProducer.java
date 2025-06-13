package com.carrefour.customerservice.events;

import com.carrefour.eventData.Event;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;


@Component
@RequiredArgsConstructor
@Slf4j
public class KafkaProducer {

    private final KafkaTemplate<String, Event> kafkaTemplate;
    private String topic = "customer-event-topic";

    public void produceEvent(Event customerEvent) {
        kafkaTemplate.send(this.topic, customerEvent.type().toString() , customerEvent);
    }

}