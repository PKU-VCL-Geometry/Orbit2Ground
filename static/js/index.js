$(document).ready(function() {
    // Gallery Logic
    let currentIndex = 0;
    const totalItems = 3;

    function updateGallery() {
        // Calculate indices
        let prevIndex = (currentIndex - 1 + totalItems) % totalItems;
        let nextIndex = (currentIndex + 1) % totalItems;

        // Reset classes
        $('.gallery-item').removeClass('active prev next');

        // Assign classes
        $(`.item-${currentIndex + 1}`).addClass('active');
        $(`.item-${prevIndex + 1}`).addClass('prev');
        $(`.item-${nextIndex + 1}`).addClass('next');

        // disable controls on non-active videos
        $('.gallery-item video').each(function(index) {
            if (index === currentIndex) {
                this.controls = true;
            } else {
                this.controls = false;
            }
        });

        // Handle videos
        $('video', '.gallery-container').each(function() {
            this.pause();
            // console.log(this.src);
            $(this).off('ended'); // Remove existing ended listeners
        });
        
        // Play active video
        const activeVideo = $(`.item-${currentIndex + 1} video`)[0];
        if (activeVideo) {
            activeVideo.currentTime = 0; // Optional: restart video
            activeVideo.play().catch(e => console.log("Autoplay prevented:", e));
            
            // Auto-advance when video ends
            $(activeVideo).on('ended', function() {
                currentIndex = (currentIndex + 1) % totalItems;
                updateGallery();
            });
        }

        // Handle dots
        $('.dot').removeClass('active');
        $(`.dot-${currentIndex + 1}`).addClass('active');
    }

    // Click handlers for dots
    $('.dot').click(function() {
        currentIndex = $(this).data('index');
        updateGallery();
    });

    // Click handlers for navigation buttons
    $('.prev-btn').click(function() {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateGallery();
    });

    $('.next-btn').click(function() {
        currentIndex = (currentIndex + 1) % totalItems;
        updateGallery();
    });

    // Click handlers for side items
    // TODO: Disabled because of bugs
    // $('.gallery-item').click(function() {
    //     if ($(this).hasClass('prev')) {
    //         currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    //         updateGallery();
    //     } else if ($(this).hasClass('next')) {
    //         currentIndex = (currentIndex + 1) % totalItems;
    //         updateGallery();
    //     }
    // });

    // Initialize
    updateGallery();
})
